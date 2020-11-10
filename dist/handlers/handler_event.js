"use strict";

module.exports = function (eventModel) {
  return {
    create: function create(props) {
      //console.log(props);
      return new Promise(function (resolve, reject) {
        var event = new eventModel(props);
        event.save(function (err, doc) {
          if (err) {
            return reject(err);
          }

          return resolve(doc);
        });
      });
    },
    drop: function drop(id) {
      return new Promise(function (resolve, reject) {
        eventModel.deleteOne({
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
        eventModel.find(props, function (err, docs) {
          if (err) {
            return reject(err);
          }

          return resolve(docs);
        });
      });
    }
  };
};