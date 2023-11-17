## Design Phase

### Brainstorming Notes
![Brainstorming Notes](/images/Brainstorming.png)

### Comparing and Contrasting the Three Ideas
![Venn Diagram of Ideas](/images/VennDiagram.png)

### High Level/Simple System Design
![Diagram of Simple System Design](/images/HighLevelSystemDesign.png)

## Configuration
### 1 - Through Docker
1) Get the Docker Image using `docker pull whanswong/solar_stewards:latest`
2) Then do `docker run -p 3000:3000 whanswong/solar_stewards`
3) Access this application at [http://localhost:3000](http://localhost:3000)

### 2 - Locally
1) Clone this repo to your local machine
2) Navigate to the project's directory
3) Set up environment variables

Create a file called `.env.local` \
Create a variable called `MONGODB_URI` and assign your MongoDB connection string to it

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.

Create a variable called `BESTBUY_API_KEY` and assign your BestBuy API Key to it

- `BESTBUY_API_KEY` - Get your own [here](https://developer.bestbuy.com/)


4) Use the `npm run dev` command
5) Access this application at [http://localhost:3000](http://localhost:3000)


## Considerations/Next Steps
- I chose to seperate item information and users to prevent replication of item information which has 150+ fields. However, this means that there is a case where no user is saving an item but it still exists in our items collection. There is no benefit to this since each keyword search query will return a list of all products that match it (handled by BestBuy), regardless of if it was previously searched and saved. 
  - Therefore, we should implement periodic cleanup. This can be done using a cron job to check for any item that is not saved by an user, or we can add a reference count for each item which is incremented when an user adds that item and decremented when an user deletes that from their wishlist, and we periodically delete any item with a count of zero.
- I implemented a simple working solution for user specific wishlists by generating a uuidv4 userID and storing it in localStorage. This allows the userID to persist over sessions. However, this is not the best practice as there can be userID collisions and there is nothing stopping others from modifying your wishlist if they get your userID.
  - Next, we should implement user authentication using something like OAuth. This protects each user's wishlist so only they can modify it.
  - We can generate an unique userID by hashing something unique like their email, or continue with uuidv4 (since there is an almost zero chance of collision) and then just check in MongoDB for collisions, and regenerate as needed.
- Currently, savedItems just displays all the user's saved items. This is not optimal when the user has saved many items. (Performance and user experience will suffer)
  - We can make it so only x items are displayed at a time, and then use numbered pages or infinite scrolling to incrementally display the rest.
- At the moment, the order of products in savedItems is arbitrary. We can improve the user experience by allowing users to filter or sort on certain criteria like date added or product price.
