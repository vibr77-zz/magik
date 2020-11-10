"use strict";

module.exports = function (spellModel) {
  return {
    create: function create(props) {
      return new Promise(function (resolve, reject) {
        var spell = new spellModel(props);
        spell.save(function (err, doc) {
          if (err) {
            return reject(err);
          }

          return resolve(doc);
        });
      });
    },
    drop: function drop(id) {
      return new Promise(function (resolve, reject) {
        spellModel.deleteOne({
          _id: id
        }, function (err) {
          if (err) {
            return reject(err);
          }

          return resolve();
        });
      });
    },
    get: function get(props) {
      return new Promise(function (resolve, reject) {
        spellModel.find(props, function (err, docs) {
          if (err) {
            return reject(err);
          }

          return resolve(docs);
        });
      });
    },
    update: function update(props) {
      return new Promise(function (resolve, reject) {
        var clonedObj = {};

        for (var key in props) {
          if (Object.prototype.hasOwnProperty.call(spellModel.schema.obj, key)) {
            clonedObj[key] = props[key];
          }
        }

        clonedObj['modificationDate'] = Date.now();
        spellModel.updateOne({
          _id: props._id
        }, clonedObj, function (err, doc) {
          if (err) {
            return reject(err);
          }

          return resolve(doc);
        });
      }); // remove:
      // removeAll:
    }
  };
};