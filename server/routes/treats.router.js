const router = require('express').Router();
const pool = require('../modules/pool');

// GET /treats
router.get('/', (req, res) => {
  console.log('In /treats GET');

  let queryText = `SELECT * FROM "treats";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`error in GET /treats ${error}`);
      res.sendStatus(500);
    });
});

// POST /treats
router.post('/', (req, res) => {
  console.log(`In /treats POST with`, req.body);

  const treatToAdd = req.body;
  const queryText = `INSERT INTO "treats" ("name", "description", "pic")
                          VALUES ($1, $2, $3);`;
  pool
    .query(queryText, [treatToAdd.name, treatToAdd.description, treatToAdd.pic])
    .then((responseFromDatabase) => {
      console.log(responseFromDatabase);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error in POST /treats ${error}`);
      res.sendStatus(500);
    });
});

// PUT /treats/<id>
router.put('/:id', (req, res) => {
  const treatId = req.params.id;
  const queryText = `UPDATE "treats" SET "description" = $1 WHERE "id" = $2;`;

  pool
    .query(queryText, [req.body.description, treatId])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('PUT Error:', err);
      res.sendStatus(500);
    });
});

// DELETE /treats/<id>
router.delete('/:id', (req, res) => {
  const treatId = req.params.id;
  const queryText = `DELETE FROM "treats" WHERE "id" = $1;`;

  pool
    .query(queryText, [treatId])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('PUT Error:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
