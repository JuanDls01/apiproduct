import sequelize from './src/sequelize';
import app from './src/app';
import environmentVariables from "./config";

// dotenv.config({ path: __dirname + '/.env' });

(async () => {
    await sequelize.sync({ force: false });
    app.listen(environmentVariables.PORT, () => {
        return console.log(`Server running on ${environmentVariables.PORT}`)
    })
})();


