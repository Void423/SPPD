app;
import "dotenv/config";
import app from "./app";
const port = process.env.PORT || 3000;

async function startServer() {
   try {
      app.listen(port, () => {
         console.log(`Server is running on port ${port} `);
      });
   } catch (error) {
      console.info(`Failed to start server ${error}`);
      process.exit(1);
   }
}

startServer();
