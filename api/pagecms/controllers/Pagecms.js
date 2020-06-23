'use strict';

/**
 * Pagecms.js controller
 *
 * @description: A set of functions called "actions" for managing `Pagecms`.
 */

module.exports = {

  /**
   * Retrieve pagecms records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.pagecms.search(ctx.query);
    } else {
      return strapi.services.pagecms.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a pagecms record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.pagecms.fetch(ctx.params);
  },

  /**
   * Count pagecms records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.pagecms.count(ctx.query);
  },

  /**
   * Create a/an pagecms record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.pagecms.add(ctx.request.body);
  },

  /**
   * Update a/an pagecms record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.pagecms.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an pagecms record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.pagecms.remove(ctx.params);
  }
};
