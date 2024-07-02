const M = 1;
const N = 30;

function primality(n) {
    for(let i = 2; i < n; i++) {
       if(n % i === 0) return false;
    }
    return n > 1;
}

for(let i = M; i <= N; i++)
{
    if(primality(i))
        console.log(i);
}