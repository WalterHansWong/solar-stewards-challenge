## Design Phase

Brainstorming Notes
![Brainstorming Notes](/images/Brainstorming.png)

Comparing and Contrasting the Three Ideas
![Venn Diagram of Ideas](/images/VennDiagram.png)

High Level/Simple System Design
![Diagram of Simple System Design](/images/HighLevelSystemDesign.png)

## Configuration

### Set up environment variables

Create a file called `.env.local`
Create a variable called MONGODB_URI and assign your MongoDB connection string to it

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that you have provided the correct `MONGODB_URI` environment variable.

When you are successfully connected, you can refer to the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further instructions on how to query your database.
