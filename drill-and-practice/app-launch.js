    import { app } from "./app.js";

    const port = 7777;

    app.addEventListener('listen', () => {
        console.log(`Listening on localhost:${port}`);
    });

    await app.listen({ port });
