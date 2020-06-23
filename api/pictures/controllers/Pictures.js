'use strict';

/**
 * Pictures.js controller
 *
 * @description: A set of functions called "actions" for managing `Pictures`.
 */

module.exports = {

  /**
   * Retrieve pictures records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.pictures.search(ctx.query);
    } else {
      return strapi.services.pictures.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a pictures record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.pictures.fetch(ctx.params);
  },

  /**
   * Count pictures records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.pictures.count(ctx.query);
  },

  /**
   * Create a/an pictures record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.pictures.add(ctx.request.body);
  },

  /**
   * Update a/an pictures record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.pictures.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an pictures record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.pictures.remove(ctx.params);
  }
};
