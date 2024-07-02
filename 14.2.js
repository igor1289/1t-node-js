async function fetchPost()
{
    const data = fetch('https://jsonplaceholder.typicode.com/posts/1');

    console.log(await (await data).json());
}

fetchPost();

