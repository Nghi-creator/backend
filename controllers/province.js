import provinceService from '../services/province.db.js';

const controller = {
  listProvince: function (req, res, next) {
    provinceService.findAll().then((provinces) => {
      res.json(provinces);
    }).catch(next);
  },
}

export default controller;
