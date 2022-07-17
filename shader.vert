// vertex shader (頂点シェーダー)

void main() {
    vec3 pos = position;

    gl_Position = vec4( pos, 1.0 )
}