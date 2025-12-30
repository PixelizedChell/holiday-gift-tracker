# CS50 React/Next JS Gift Tracker
### Video Demo: https://youtu.be/ymcRN0Cmh1o
### Description:
    A web application utilizing React and Next.js and deployed with Netlify to track gifts for various holidays. Users can register as well as log in and see their own information. They enter a giftee's information, which will automatically generate a holiday for the giftees birthday birthday. Users can also add custom holidays to add gifts for. Finally, the user can enter a gift they plan on getting, select the holiday and giftee, as well as the price, link to the product page, and any additional information they wish to add, as well as whether or not the gift has been purchased. They are then able to see the gift information on the homepage, and can update and delete the gift information as well. It utilizes a Postgres datababase that holds information about giftees, holidays, and gifts, and associates them wtith their user information from Clerk to create personalized tables for each user.
    The URL to the deployed site is https://cs50holidaygifttracker.netlify.app/

### Authorization/Authentication
    This application uses Clerk for user registration, login, and authentication. Users will be prompted to either register or log in when they first visit the website, and will only see the registration and login pages until they are properly logged in. After login, they are taken to the homepage.

### Design
    This application uses Material UI components for a clean, cohesive design.

### Homepage
    The homepage is the main page of the application. This page has a table that lists the user's planned gifts, along with recipient an holiday information, as well as links and shows whether or not the gift has already been purchased. Gifts that have not yet been purchased are shown in red.  Next to each gift, there are buttons that allow the user to either edit them, or delete them from the list. Clicking on the Edit button brings up a modal to update any of the gift information and can also be used to mark the gift as purchased. If the user has not added any gifts yet, there will be a message prompting them to add recipients, holidays, and gifts to populate the page.

### Giftees page
    The giftees page is a table that shows the giftees that the user has added. If no giftees have been added, the table will be blank. Under the table, there is a button that the user can click on to create a new recipient and enter their information. Once the giftee is added, they will appear on the table, and a holiday will also automatically be created for their birthday.

### Holidays page
    The holidays page is very similar to the giftees page; holidays are shown in the table and the user can click on the button below the table to add new holidays as needed. A new holiday for each giftee's birthday is added automatically after the giftee is added.

### Add Gift Page
    The Add Gift Page allows the user to add a new gift along with all relevant information. The user can select from their added giftees and holidays to properly categorize the gift, and add a link to the purchase page, as well as the price, any miscellaneous information, and whether or not the gift has already been purchased. This same component is also used for the Edit button for the gift on the homepage, allowing the user to update the information as needed.

### AI Usage/Credit/What I have learned
    The work was my own, with AI assistance used primarily for assisting with debugging and figuring out why error messages were showing, translating my SQL query to the ORM's syntax, and assisting with the JSConfig.  I used Cursor only to diagnose and help with fixing bugs in code that I had already written, and used Perplexity to help convert my initial SQL select statement into Drizzle's ORM syntax. Netlify provided a Next.js starter, which I completely reworked and made my own. In this project, I learned a lot about routing and user authentication, and how to use an ORM to query the database. I also learned about deploying to the web using Netlify, and learned to debug failed builds. I had previously known how to use React, but learned about using routes with Next.js and familiarized myself with using Postgres as my database. In the future, moving beyond an MVP, I would like to add a page showing which giftees do not yet have a corresponding gift, as well as the ability to update giftee and holiday information.