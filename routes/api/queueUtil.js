var keystone = require('keystone'),
  http = require('http'),
  request = require('request'),
  fs = require('fs');
var async = require('async');

var scraperjs = require('scraperjs');
var kue = require('kue'),
  queue = kue.createQueue();


exports = module.exports = function(req, res) {

  var job = queue.create('email', {
    title: 'job1',
    to: 'tj@learnboost.com',
    template: 'welcome-email'
  }).save(function(err) {
    if (!err) console.log(job.id);
  });

  queue.create('emails', {
    title: 'welcome email for tj',
    to: 'tj@learnboost.com',
    template: 'welcome-email'
  }).priority('high').save(function(err) {
    if (!err) console.log('任务', job.id);
  });
};
