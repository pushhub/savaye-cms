'use strict';

/* global Welcomepage */

/**
 * Welcomepage.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const { convertRestQueryParams, buildQuery } = require('strapi-utils');

module.exports = {

  /**
   * Promise to fetch all welcomepages.
   *
   * @return {Promise}
   */

  fetchAll: (params, populate) => {
    const filters = convertRestQueryParams(params);
    const populateOpt = populate || Welcomepage.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)

    return buildQuery({
      model: Welcomepage,
      filters,
      populate: populateOpt,
    });
  },

  /**
   * Promise to fetch a/an welcomepage.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Welcomepage.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Welcomepage
      .findOne(_.pick(params, _.keys(Welcomepage.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count welcomepages.
   *
   * @return {Promise}
   */

  count: (params) => {
    const filters = convertRestQueryParams(params);

    return buildQuery({
      model: Welcomepage,
      filters: { where: filters.where },
    })
      .count()
  },

  /**
   * Promise to add a/an welcomepage.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Welcomepage.associations.map(ast => ast.alias));
    const data = _.omit(values, Welcomepage.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Welcomepage.create(data);

    // Create relational data and return the entry.
    return Welcomepage.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an welcomepage.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Welcomepage.associations.map(a => a.alias));
    const data = _.omit(values, Welcomepage.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Welcomepage.updateOne(params, data, { multi: true });

    // Update relational data and return the entry.
    return Welcomepage.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an welcomepage.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Welcomepage.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Welcomepage
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Welcomepage.associations.map(async association => {
        if (!association.via || !data._id || association.dominant) {
          return true;
        }

        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an welcomepage.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('welcomepage', params);
    // Select field to populate.
    const populate = Welcomepage.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Welcomepage.attributes).reduce((acc, curr) => {
      switch (Welcomepage.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Welcomepage
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
