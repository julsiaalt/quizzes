    import { sql } from '../../database/database.js';
    import { bcrypt } from '../../deps.js';

    const login = async ({ render, request, response, state }) => {
        switch (request.method) {
            case "GET":
                render("login.eta");
                break;
            case "POST":
                let params = {};
                const data = await request.body().value;
                for (const [key, valor] of data) {
                    params[key] = valor;
                }
                let users = (await sql`select * from users where email=${params.email}`);
                if (users.length) {
                    if (await bcrypt.compare(params.password, users[0].password)) {
                        state.session.set('userInfo', users[0]);
                        return response.redirect('/topics');   
                    } else {
                        render("login.eta", { password: "Password incorrect!" });
                    }
                } else {
                    render("login.eta", { email: "Not registered yet!" });
                }
                break;
        }
    };

    const register = async ({ request, render, response }) => {
        switch (request.method) {
            case "GET":
                render("register.eta");
                break;
            case "POST":
                let params = {};
                const data = await request.body().value;
                for (const [key, valor] of data) {
                    params[key] = valor;
                }
                if (params.password.length < 4) {
                    render("register.eta", {password: "Password must be at least 4 characters!"});
                } else {
                    let pwd = (await bcrypt.hash(params.password));
                    try {
                        let res = (await sql`insert into users (email, password) values (${params.email}, ${pwd})`);
                    } catch (err) {
                        render("register.eta", { email: "Already Exists!" });
                    }
                    return response.redirect('/auth/login');
                }
                break;
        }
    };

    export { login, register };
