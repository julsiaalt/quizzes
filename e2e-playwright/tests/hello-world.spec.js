const { test, expect } = require("@playwright/test");


test("Main page has expected title and headings.", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Quiz app");
    await expect(page.locator("h1")).toHaveText("Quiz application");
  });
  
  const email = `${Math.random()}@email.com`;
  const password = `${Math.random()}`;
  
  test("Can register a user", async ({ page }) => {
    await page.goto("/auth/register");
    await page.locator("input[type=email]").type(email);
    await page.locator("input[type=password]").type(password);
    await page.locator("input[value='Register']").click();
    await expect(page.locator("h1").first()).toHaveText("Login form");
  });
  
  test("Can login as that user", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type(email);
    await page.locator("input[type=password]").type(password);
    await page.locator("input[value='Login']").click();
    await expect(page.locator("h1").first()).toHaveText("Available Topics");
  });
  
  test("A normal user does not see the add topic section", async ({ page }) => {
    await page.goto("/topics");
    await expect(page.locator("h1").first()).not.toHaveText("Add a topic");
  });
  
  test("Can login as admin", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[value='Login']").click();
    await expect(page.locator("h1").first()).toHaveText("Add a topic");
  });
  
  test("Can add a topic as admin.", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[value='Login']").click();
    await page.goto("/topics");
    const topic = `Topic: ${Math.random()}`;
    await page.locator("input[name=name]").type(topic);
    await page.locator("input[value='Add topic']").click();
    await page.locator(`a >> text='${topic}'`).click();
    await expect(page.locator("h1")).toContainText(topic);
  });
  
  test("Can add a question to a topic.", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[value='Login']").click();
    await page.goto("/topics");
    const topic = `Topic: ${Math.random()}`;
    await page.locator("input[name=name]").type(topic);
    await page.locator("input[value='Add topic']").click();
    await page.locator(`a >> text='${topic}'`).click();
    const question = `Question: ${Math.random()}`;
    await page.locator("input[type=text]").type(question);
    await page.locator("input[value='Add question']").click();
    await page.locator(`a >> text='${question}'`).click();
    await expect(page.locator("h1")).toContainText(question);
  });
  
  test("Can add answer option.", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[value='Login']").click();
    await page.goto("/topics");
    const topic = `Topic: ${Math.random()}`;
    await page.locator("input[name=name]").type(topic);
    await page.locator("input[value='Add topic']").click();
    await page.locator(`a >> text='${topic}'`).click();
    const question = `Question: ${Math.random()}`;
    await page.locator("input[type=text]").type(question);
    await page.locator("input[value='Add question']").click();
    await page.locator(`a >> text='${question}'`).click();
    const option = `Option: ${Math.random()}`;
    await page.locator("input[type=text]").type(option);
    await page.locator("input[value='Add answer option']").click();
  });
  
  test("Can delete answer option.", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[value='Login']").click();
    await page.goto("/topics");
    const topic = `Topic: ${Math.random()}`;
    await page.locator("input[name=name]").type(topic);
    await page.locator("input[value='Add topic']").click();
    await page.locator(`a >> text='${topic}'`).click();
    const question = `Question: ${Math.random()}`;
    await page.locator("input[type=text]").type(question);
    await page.locator("input[value='Add question']").click();
    await page.locator(`a >> text='${question}'`).click();
    const option = `Option: ${Math.random()}`;
    await page.locator("input[type=text]").type(option);
    await page.locator("input[value='Add answer option']").click();
    await page.locator("input[value='Delete']").click();
  });
  
  test("Can delete question.", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[value='Login']").click();
    await page.goto("/topics");
    const topic = `Topic: ${Math.random()}`;
    await page.locator("input[name=name]").type(topic);
    await page.locator("input[value='Add topic']").click();
    await page.locator(`a >> text='${topic}'`).click();
    const question = `Question: ${Math.random()}`;
    await page.locator("input[type=text]").type(question);
    await page.locator("input[value='Add question']").click();
    await page.locator(`a >> text='${question}'`).click();
    await page.locator("input[value='Delete question']").click();
  });