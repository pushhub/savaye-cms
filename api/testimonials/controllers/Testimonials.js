'use strict';

/**
 * Testimonials.js controller
 *
 * @description: A set of functions called "actions" for managing `Testimonials`.
 */

module.exports = {

  /**
   * Retrieve testimonials records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.testimonials.search(ctx.query);
    } else {
      return strapi.services.testimonials.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a testimonials record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.testimonials.fetch(ctx.params);
  },

  /**
   * Count testimonials records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.testimonials.count(ctx.query);
  },

  /**
   * Create a/an testimonials record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.testimonials.add(ctx.request.body);
  },

  /**
   * Update a/an testimonials record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.testimonials.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an testimonials record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.testimonials.remove(ctx.params);
  }
};
