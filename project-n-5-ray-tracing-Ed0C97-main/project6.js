var raytraceFS = `
struct Ray {
	vec3 pos;
	vec3 dir;
};

struct Material {
	vec3  k_d;	
	vec3  k_s;	
	float n;	
};

struct Sphere {
	vec3     center;
	float    radius;
	Material mtl;
};

struct Light {
	vec3 position;
	vec3 intensity;
};

struct HitInfo {
	float    t;
	vec3     position;
	vec3     normal;
	Material mtl;
};

uniform Sphere spheres[ NUM_SPHERES ];
uniform Light  lights [ NUM_LIGHTS  ];
uniform samplerCube envMap;
uniform int bounceLimit;

bool IntersectRay( inout HitInfo hit, Ray ray );

vec3 Shade( Material mtl, vec3 position, vec3 normal, vec3 view )
{
	vec3 color = vec3(0,0,0);
	for ( int i=0; i<NUM_LIGHTS; ++i ) {
		vec3 shadowRayDir = lights[i].position - position;
		float shadowRayLen = length(shadowRayDir);
		shadowRayDir = normalize(shadowRayDir);
		Ray shadowRay;
		shadowRay.pos = position + shadowRayDir * 0.001; 
		shadowRay.dir = shadowRayDir;
		HitInfo shadowHit;
		if (!IntersectRay(shadowHit, shadowRay) || shadowHit.t >= shadowRayLen) {
			vec3 lightDir = normalize(lights[i].position - position);
			vec3 halfVec = normalize(lightDir + view);
			float diffuse = max(dot(normal, lightDir), 0.0);
			float specular = pow(max(dot(normal, halfVec), 0.0), mtl.n);
			color += (mtl.k_d * diffuse + mtl.k_s * specular) * lights[i].intensity;
		}
	}
	return color;
}

bool IntersectRay( inout HitInfo hit, Ray ray )
{
	hit.t = 1e30;
	bool foundHit = false;
	for ( int i=0; i<NUM_SPHERES; ++i ) {
		vec3 oc = ray.pos - spheres[i].center;
		float a = dot(ray.dir, ray.dir);
		float b = 2.0 * dot(oc, ray.dir);
		float c = dot(oc, oc) - spheres[i].radius * spheres[i].radius;
		float discriminant = b * b - 4.0 * a * c;
		if (discriminant > 0.0) {
			float temp = (-b - sqrt(discriminant)) / (2.0 * a);
			if (temp < hit.t && temp > 0.001) {
				hit.t = temp;
				hit.position = ray.pos + ray.dir * hit.t;
				hit.normal = normalize(hit.position - spheres[i].center);
				hit.mtl = spheres[i].mtl;
				foundHit = true;
			}
		}
	}
	return foundHit;
}

vec4 RayTracer( Ray ray )
{
	HitInfo hit;
	if ( IntersectRay( hit, ray ) ) {
		vec3 view = normalize( -ray.dir );
		vec3 clr = Shade( hit.mtl, hit.position, hit.normal, view );
		
		vec3 k_s = hit.mtl.k_s;
		for ( int bounce=0; bounce<MAX_BOUNCES; ++bounce ) {
			if ( bounce >= bounceLimit ) break;
			if ( k_s.r + k_s.g + k_s.b <= 0.0 ) break;
			
			Ray r;	
			r.pos = hit.position + hit.normal * 0.001; 
			r.dir = reflect(ray.dir, hit.normal);
			HitInfo h;	
			
			if ( IntersectRay( h, r ) ) {
				vec3 view_refl = normalize( -r.dir );
				clr += k_s * Shade( h.mtl, h.position, h.normal, view_refl );
				k_s *= h.mtl.k_s;
			} else {
				clr += k_s * textureCube( envMap, r.dir.xzy ).rgb;
				break;
			}
		}
		return vec4( clr, 1 );	
	} else {
		return vec4( textureCube( envMap, ray.dir.xzy ).rgb, 1 ); 

	}
}
`;
