const express = require('express');
const cors = require('cors');

const apiRoutes = require('./routes/api.routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
