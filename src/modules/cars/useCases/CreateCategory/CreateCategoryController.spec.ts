import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const password = await hash("admin", 8);
        const id = uuidv4();

        await connection.query(`INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
        values ('${id}', 'admin', 'admin', '${password}', true, now(), 'XXXXXXXXXX')`);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able create a new Category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .get("/categories")
            .send({
                name: "Catego",
                description: "Desc",
            })
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(200);
    });
});
