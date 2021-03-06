<template>
    <div class="ui segments">
        <div v-if="title || showCollapseToggle" class="ui basic segment text menu">
            <div class="item">
                <h2 class="heading ui-sortable-handle">{{ title }}</h2>
            </div>
            <div class="right item">
                <slot name="extra"></slot>
                <croud-dropdown-indicator-button v-if="showCollapseToggle" :collapsed="collapse" @click="collapse = !collapse"/>
            </div>
        </div>
        <div class="ui basic">
            <transition name="slide-down">
                <div v-show="!collapse">
                    <slot></slot>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import CroudDropdownIndicatorButton from '../buttons/DropdownIndicatorButton'

    /**
     * Generic Croud card component
     *
     * @example ./croud-panel.md
     */
    export default {
        name: 'croud-panel',

        components: {
            CroudDropdownIndicatorButton,
        },

        props: {
            /**
             * Set the large title in the top left of the card
             */
            title: {
                type: String,
                default: 'Title',
            },

            /**
             * Show collapse/open toggle
             */
            showCollapseToggle: {
                type: Boolean,
                default: true,
            },
        },

        data() {
            return {
                collapse: false,
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../../resources/sass/variables/_all.scss';

    .ui.black.inverted.segment {
        background-color: $croud-colour-header !important;
    }

    .ui.basic {
        position: relative;
    }

    .slide-down-enter-active, .slide-down-leave-active {
        max-height: 1000px;
        transition: all .3s ease;
    }

    .slide-down-enter, .slide-down-leave-to {
        max-height: 0 !important;
        overflow-y: hidden;
        opacity: 0;
    }

    h2 {
        font-family: $croud-font-headline;
        border-bottom: 3px solid #f4c91b;
        text-transform: uppercase;
        font-weight: 400;
        font-size: $croud-font-size-massive;
        padding-bottom: 0.1em;
        margin-bottom: 0.8em;
        margin-top: 0.4em;
    }

    .ui.text.menu {
        padding-top: 0;
        padding-bottom: 0;
    }

    .ui.segments {
        background: $croud-colour-card;
    }

</style>

<style lang="scss">

    .ui.segment.filterbox.text.menu {
        border-bottom: 1px solid hsla(0,0%,39%,.07);

        + .loader-container {
            margin-top: 0;

            .ui.table {
                margin-bottom: 0;
            }
        }
    }
</style>
