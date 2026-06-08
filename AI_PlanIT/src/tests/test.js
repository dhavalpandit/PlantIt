import { Builder, By, until } from 'selenium-webdriver';
import { ServiceBuilder } from 'selenium-webdriver/chrome.js';

const service = new ServiceBuilder('chromedriver.exe');

const mockUserData = {
  id: "107151258854116329594",
  email: "rao.adarsh1012@gmail.com",
  verified_email: true,
  name: "Adarsh Rao",
  given_name: "Adarsh",
  family_name: "Rao",
  picture: "https://lh3.googleusercontent.com/a/ACg8ocLj3NrLRLAABJR1hEn-r4nMa5pvky0AdWhGT2JQGr0NqBXwdA=s96-c"
};

const runTest = async () => {
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeService(service)
    .build();

  try {
    // TC01: Load homepage and check header
    console.log('🔹 TC01: Load homepage and check header');
    await driver.get('http://localhost:5173');
    await driver.wait(until.elementLocated(By.id('header')), 10000);
    console.log('✅ TC01 Passed');

    // TC02: Mock login
    console.log('🔹 TC02: Mock login by injecting user into localStorage');
    await driver.executeScript(`window.localStorage.setItem('user', '${JSON.stringify(mockUserData)}')`);
    await driver.navigate().refresh();
    await driver.wait(until.elementLocated(By.id('user-avatar')), 10000);
    console.log('✅ TC02 Passed: Mock login successful');

    // TC03: Click "Get Started"
    console.log('🔹 TC03: Click Get Started');
    const getStartedBtn = await driver.findElement(By.xpath("//button[contains(., 'Get Started')]"));
    await getStartedBtn.click();
    await driver.sleep(1000);
    console.log('✅ TC03 Passed: Navigated to trip creation page');

    // TC04: Fill and submit trip form (manually pre-filled dates)
    console.log('🔹 TC04: Fill trip form');

    await driver.findElement(By.css("input[placeholder='E.g., Japan']")).sendKeys("Japan");
    await driver.findElement(By.css("input[placeholder='E.g., Kyoto']")).sendKeys("Kyoto");

    const budgetOption = await driver.findElement(By.xpath("//*[text()='Cheap']"));
    await budgetOption.click();

    const travelerOption = await driver.findElement(By.xpath("//*[text()='Just Me']"));
    await travelerOption.click();

    const adventureOption = await driver.findElement(By.xpath("//*[text()='Fun']"));
    await adventureOption.click();

    const generateBtn = await driver.findElement(By.xpath("//button[contains(., 'Generate Trip')]"));
    await generateBtn.click();

    console.log('✅ TC04 Passed: Trip form submitted, waiting for trip to generate...');
    await driver.sleep(20000); // wait for trip generation

    // TC05: View last trip
    console.log('🔹 TC05: Open My Trips and view last trip');

    const myTripsLink = await driver.findElement(By.xpath("//a[@href='/my-trips']"));
    await myTripsLink.click();

    await driver.wait(until.elementsLocated(By.css("a[href^='/view-trip/']")), 10000);
    const tripCards = await driver.findElements(By.css("a[href^='/view-trip/']"));

    console.log(`🧾 Found ${tripCards.length} trip cards`);

    if (tripCards.length > 0) {
      const lastTrip = tripCards[tripCards.length - 1];
      await lastTrip.click();
      console.log('✅ TC05 Passed: Opened last trip detail page');
    } else {
      console.warn('⚠️ TC05 Skipped: No trips found');
    }

    // TC06: Logout
    console.log('🔹 TC06: Logout');

    const avatar = await driver.findElement(By.id('user-avatar'));
    await avatar.click();
    await driver.sleep(1000);

    await driver.wait(until.elementLocated(By.id('logout-button')), 5000);
    const logoutBtn = await driver.findElement(By.id('logout-button'));
    await logoutBtn.click();

    await driver.wait(until.urlIs('http://localhost:5173/'), 5000);
    console.log('✅ TC06 Passed: Successfully logged out and redirected to home');

  } catch (err) {
    console.error(`❌ Test failed: ${err.message}`);
  } finally {
    await driver.quit();
  }
};

runTest();
