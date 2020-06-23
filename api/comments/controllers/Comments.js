'use strict';

/**
 * Comments.js controller
 *
 * @description: A set of functions called "actions" for managing `Comments`.
 */

module.exports = {

  /**
   * Retrieve comments records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.comments.search(ctx.query);
    } else {
      return strapi.services.comments.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a comments record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.comments.fetch(ctx.params);
  },

  /**
   * Count comments records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.comments.count(ctx.query);
  },

  /**
   * Create a/an comments record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.comments.add(ctx.request.body);
  },

  /**
   * Update a/an comments record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.comments.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an comments record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.comments.remove(ctx.params);
  }
};
