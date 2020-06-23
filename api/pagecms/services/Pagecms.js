'use strict';

/* global Pagecms */

/**
 * Pagecms.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const { convertRestQueryParams, buildQuery } = require('strapi-utils');

module.exports = {

  /**
   * Promise to fetch all pagecms.
   *
   * @return {Promise}
   */

  fetchAll: (params, populate) => {
    const filters = convertRestQueryParams(params);
    const populateOpt = populate || Pagecms.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)

    return buildQuery({
      model: Pagecms,
      filters,
      populate: populateOpt,
    });
  },

  /**
   * Promise to fetch a/an pagecms.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Pagecms.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Pagecms
      .findOne(_.pick(params, _.keys(Pagecms.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count pagecms.
   *
   * @return {Promise}
   */

  count: (params) => {
    const filters = convertRestQueryParams(params);

    return buildQuery({
      model: Pagecms,
      filters: { where: filters.where },
    })
      .count()
  },

  /**
   * Promise to add a/an pagecms.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Pagecms.associations.map(ast => ast.alias));
    const data = _.omit(values, Pagecms.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Pagecms.create(data);

    // Create relational data and return the entry.
    return Pagecms.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an pagecms.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Pagecms.associations.map(a => a.alias));
    const data = _.omit(values, Pagecms.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Pagecms.updateOne(params, data, { multi: true });

    // Update relational data and return the entry.
    return Pagecms.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an pagecms.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Pagecms.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Pagecms
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Pagecms.associations.map(async association => {
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
   * Promise to search a/an pagecms.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('pagecms', params);
    // Select field to populate.
    const populate = Pagecms.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Pagecms.attributes).reduce((acc, curr) => {
      switch (Pagecms.attributes[curr].type) {
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

    return Pagecms
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
