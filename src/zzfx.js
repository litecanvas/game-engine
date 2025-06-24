// ZzFXMicro - Zuper Zmall Zound Zynth - v1.3.0 by Frank Force | https://github.com/KilledByAPixel/ZzFX
// prettier-ignore
/**
 * @param {Window} global
 * @returns {Function} the `zzfx()` function
 */
export const setupZzFX = (global) => {
    const zzfxX = new AudioContext()

    global.zzfxV = 1

    return (i=1,d=.05,z=220,e=0,P=0,S=.1,I=0,c=1,T=0,H=0,V=0,J=0,h=0,j=0,K=0,E=0,r=0,B=1,X=0,L=0,D=0)=>{let n=Math,t=2*n.PI,a=44100,F=T*=500*t/a/a,O=z*=(1-d+2*d*n.random(d=[]))*t/a,x=0,_=0,f=0,g=1,$=0,l=0,o=0,s=D<0?-1:1,u=t*s*D*2/a,G=n.cos(u),C=n.sin,Q=C(u)/4,M=1+Q,m=-2*G/M,y=(1-Q)/M,R=(1+s*G)/2/M,A=-(s+G)/M,v=R,U=0,W=0,Y=0,Z=0;for(e=a*e+9,X*=a,P*=a,S*=a,r*=a,H*=500*t/a**3,K*=t/a,V*=t/a,J*=a,h=a*h|0,i*=.3*global.zzfxV,s=e+X+P+S+r|0;f<s;d[f++]=o*i)++l%(100*E|0)||(o=I?1<I?2<I?3<I?C(x*x):n.max(n.min(n.tan(x),1),-1):1-(2*x/t%2+2)%2:1-4*n.abs(n.round(x/t)-x/t):C(x),o=(h?1-L+L*C(t*f/h):1)*(o<0?-1:1)*n.abs(o)**c*(f<e?f/e:f<e+X?1-(f-e)/X*(1-B):f<e+X+P?B:f<s-r?(s-f-r)/S*B:0),o=r?o/2+(r>f?0:(f<s-r?1:(s-f)/r)*d[f-r|0]/2/i):o,D&&(o=Z=v*U+A*(U=W)+R*(W=o)-y*Y-m*(Y=Z))),u=(z+=T+=H)*n.cos(K*_++),x+=u+u*j*C(f**5),g&&++g>J&&(z+=V,O+=V,g=0),!h||++$%h||(z=O,T=F,g=g||1);i=zzfxX.createBuffer(1,s,a),i.getChannelData(0).set(d),z=zzfxX.createBufferSource(),z.buffer=i,z.connect(zzfxX.destination),z.start()};
}
