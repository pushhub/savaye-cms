'use strict';

/**
 * Highlights.js controller
 *
 * @description: A set of functions called "actions" for managing `Highlights`.
 */

module.exports = {

  /**
   * Retrieve highlights records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.highlights.search(ctx.query);
    } else {
      return strapi.services.highlights.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a highlights record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.highlights.fetch(ctx.params);
  },

  /**
   * Count highlights records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.highlights.count(ctx.query);
  },

  /**
   * Create a/an highlights record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.highlights.add(ctx.request.body);
  },

  /**
   * Update a/an highlights record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.highlights.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an highlights record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.highlights.remove(ctx.params);
  }
};
