function isMobile(){
    var isMob = (/iphone|ipod|android|ie|blackberry|fennec/).test(navigator.userAgent.toLowerCase());
    return isMob;
}
window.onload=function(){
if(isMobile()){
swal("Mobile Device Detected!","Device May Play Slower,Try in Desktop",'warning')}}

function custom(){
    window.open('custom.html','_self')
}

function showInstr(){
    text='1.Supports expressions containing *,^,/,%,sin,cos,tan and many more ...(https://mathjs.org/docs/reference/functions.html)\n\n2."p" represents count ranging from 1 to 200.\n\n3."[q]" represents the q(th) term (starts at 1).\n\n4."Example 1: 2*p = 0,2,4,8,10..."\n\n5.Example 2: [q-1]+[q-2]: Fibonacci Sequence.\n\n5.Nesting of [q[q-1]] must be avoided.\n\n6.Example 3: 2*sin(p*50)+tan(45): 1,1,1,0,0,0,0,0,0,0,1,1,2,2,3,3....'
    swal("Get Started !",text,'info')
}

function instr(){
    showInstr()
}


