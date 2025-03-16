const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
const migrationId = 'mock-migration-id';
const hostname = "https://hello-example-on33.onrender.com/"
app.post('/migration', (req, res) => {
  const mockMigration = {
    id: 'mock-mongo-id',
    status: 'pending',
    tenantId: 'abc',
    type: 'MigrateBatch1',
    data: [{
      workItemId: 'mock-work-item-id',
      totalGroups: 10,
      migratedGroups: 0,
      totalUsers: 1,
      migratedUsers: 0,
      roleId: 'mock-role-id',
      newRoleName: 'new-role',
      createNewRole: false
    }],
    links: {
      self: `${hostname}/migration/mock-mongo-id`,
    }
  };
  res.status(201).json(mockMigration);
});


app.get('/migration/:id', (req, res) => {
  const refresh = parseInt(req.query.refresh, 10);
  const mockMigration = {
    id: req.params.id,
    status: 'pending',
    tenantId: 'abc',
    type: 'MigrateBatch1',
    data: [{
      workItemId: 'mock-work-item-id',
      totalGroups: 10,
      migratedGroups: 0,
      totalUsers: 1,
      migratedUsers: 0,
      roleId: 'mock-role-id',
      newRoleName: 'new-role',
      createNewRole: false
    }],
    links: {
      self: `${hostname}/migration/mock-mongo-id`,
    }
  };

  if (refresh === 1) {
    mockMigration.data[0].migratedGroups = refresh;
    mockMigration.data[0].migratedUsers = refresh;
  } else if (refresh > 1) {
    mockMigration.status = 'processing';
    if (refresh > 10) {
      mockMigration.status = 'complete';
    }
  }

  res.json(mockMigration);
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
