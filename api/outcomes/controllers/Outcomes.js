'use strict';

/**
 * Outcomes.js controller
 *
 * @description: A set of functions called "actions" for managing `Outcomes`.
 */

module.exports = {

  /**
   * Retrieve outcomes records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.outcomes.search(ctx.query);
    } else {
      return strapi.services.outcomes.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a outcomes record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.outcomes.fetch(ctx.params);
  },

  /**
   * Count outcomes records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.outcomes.count(ctx.query);
  },

  /**
   * Create a/an outcomes record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.outcomes.add(ctx.request.body);
  },

  /**
   * Update a/an outcomes record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.outcomes.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an outcomes record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.outcomes.remove(ctx.params);
  }
};
