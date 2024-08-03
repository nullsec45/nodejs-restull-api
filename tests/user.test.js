import { web } from "../src/applications/web.js";
import { prismaClient } from "../src/applications/database.js";
import supertest from "supertest";

import { logger } from "../src/applications/logging.js";

describe("POST /api/users", function () {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "fajar45",
      },
    });
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "fajar45",
      password: "Rahasia",
      name: "Rama Fajar",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("fajar45");
    expect(result.body.data.name).toBe("Rama Fajar");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if username already registered", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "fajar45",
      password: "Rahasia",
      name: "Rama Fajar",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("fajar45");
    expect(result.body.data.name).toBe("Rama Fajar");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "fajar45",
      password: "Rahasia",
      name: "Rama Fajar",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
