import { Container, CosmosClient } from '@azure/cosmos';
import { cosmosDBConfig } from '../config/cosmosdbConfig';

const client = new CosmosClient({
  endpoint: cosmosDBConfig.endpoint,
  key: cosmosDBConfig.key,
});

export const database = client.database(cosmosDBConfig.databaseId);
