<template>
  <div v-if="outOfView" class="placeholder">&nbsp;</div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
    /**
     * Lazy load any child content when this higher order component comes into view
     *
     * @example ./lazy-load.md
     */
    export default {
        name: 'lazy-load',

        props: {
            /**
             * Intersection Observer options
             * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
             */
            options: {
                type: Object,
                default() {
                    return {}
                },
            },
        },

        data() {
            return {
                outOfView: true,
            }
        },

        mounted() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        this.outOfView = false
                        observer.disconnect()
                    }
                })
            }, this.options)

            observer.observe(this.$el)
        },
    }
</script>

<style scoped>
    .placeholder {
        min-height: 10px;
    }
</style>
