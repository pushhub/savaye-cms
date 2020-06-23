'use strict';

/**
 * Welcomepage.js controller
 *
 * @description: A set of functions called "actions" for managing `Welcomepage`.
 */

module.exports = {

  /**
   * Retrieve welcomepage records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.welcomepage.search(ctx.query);
    } else {
      return strapi.services.welcomepage.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a welcomepage record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.welcomepage.fetch(ctx.params);
  },

  /**
   * Count welcomepage records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.welcomepage.count(ctx.query);
  },

  /**
   * Create a/an welcomepage record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.welcomepage.add(ctx.request.body);
  },

  /**
   * Update a/an welcomepage record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.welcomepage.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an welcomepage record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.welcomepage.remove(ctx.params);
  }
};
