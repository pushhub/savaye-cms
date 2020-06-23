'use strict';

/**
 * Partners.js controller
 *
 * @description: A set of functions called "actions" for managing `Partners`.
 */

module.exports = {

  /**
   * Retrieve partners records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.partners.search(ctx.query);
    } else {
      return strapi.services.partners.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a partners record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.partners.fetch(ctx.params);
  },

  /**
   * Count partners records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.partners.count(ctx.query);
  },

  /**
   * Create a/an partners record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.partners.add(ctx.request.body);
  },

  /**
   * Update a/an partners record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.partners.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an partners record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.partners.remove(ctx.params);
  }
};
