/**
 * TasksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  get: function(req, res) {
    Task.find()
        .then(function(tasks) {
          if(!tasks || tasks.length === 0) {
            return res.send({
              'success': false,
              'message': 'No se encontraron tareas registradas'
            })
          }

          return res.send({
            'success': true,
            'message': 'Tareas encontradas',
            'data': tasks
          })
        
        })
        .catch(function(error) {
          sails.log.debug(error);
          return res.send({
            'success': false,
            'message': 'No encontramos ningun registro'
          })
        })
      
  },

  create: function(req, res) {
    sails.log.debug(req.allParams());

    Task.create((req.allParams))
        .then(function(task) {
          return res.send({
            'success': true,
            'message': 'Se obtuvieron tareas de la BD'
          })
          .catch(function(error) {
            sails.log.debug(error);

            return res.send({
              'success': false,
              'message': 'No se encontraron registros en BD'
            })
          })

        })
  },

  update: function(req, res) {
    Task.update(req.params('id'), req.allParams())
        .then(function(task) {
          return res.send({
            'success': true,
            'message': 'Se actualizo corretamente la tarea',
            'data': task
          })

          .catch(function(error) {
            sails.log.debug(error);

            return res.send({
              'success': false,
              'message': 'No se pudo actualizar la tarea'
            })
          })
        })
  },

  delete: function(req, res) {
    Task.destroy(req.params('id'))
        .then(function(task) {
          return res.send({
            'success': true,
            'message': 'Se elimino correctamente la tarea',
            'data': task
          })

          .catch(function(error) {
            sails.log.debug(error);

            return res.send({
              'success': false,
              'message': 'No se pudo eliminar la tarea'
            })
          })
        })
  }

};

