<script>
    import debounce from 'lodash/debounce'
    import defaultsDeep from 'lodash/defaultsDeep'

    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
    import VuetableDropdownPagination from 'vuetable-2/src/components/VuetablePaginationDropdown'
    import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
    import CroudPagination from './layout/datatable/Pagination'

    /**
     * A flexible datatable that handles API calls and pagination
     * @example ./croud-datatable.md
     */
    export default {
        name: 'croud-datatable',

        components: {
            Vuetable,
            VuetablePagination,
            VuetableDropdownPagination,
            VuetablePaginationInfo,
            CroudPagination,
        },

          /* eslint-disable object-shorthand */
        render: function (createElement) {
            return createElement('div', { class: 'ui basic segment' }, [
                createElement('vuetable', {
                    props: {
                        ...this.$props,
                        ...this.config,
                    },
                    scopedSlots: this.$scopedSlots,
                    ref: 'vuetable',
                    on: {
                        'vuetable:pagination-data': this.onPaginationData,
                        'vuetable:cell-clicked': this.onCellClicked,
                        'vuetable:loading': () => { this.loading = true },
                        'vuetable:loaded': () => { this.loading = false },
                        ...this.$listeners,
                    },
                }),
                createElement('div', { class: ['ui', 'segment', 'grid', 'basic'] }, [
                    createElement('vuetable-pagination-info', {
                        ref: 'paginationInfo',
                        props: {
                            noDataTemplate: '',
                        },
                    }),
                    createElement(this.paginatorComponent, {
                        ref: 'pagination',
                        on: {
                            'vuetable-pagination:change-page': this.onChangePage,
                        },
                    }),
                ]),
                createElement('div', {
                    class: {
                        ui: true,
                        inverted: true,
                        dimmer: true,
                        active: this.loading,
                    },
                }, [
                    createElement('div', { class: 'ui text large loader' }),
                ]),
            ])
        },

        props: {
            /**
             * vueTable-2 config that gets passed through to vue-table
             * @see https://github.com/ratiw/vuetable-2
             */
            vuetableConfig: {
                type: Object,
                required: true,
            },

            /**
             * Name of the globally registered component that will be used as the detail row
             * @see https://github.com/ratiw/vuetable-2-tutorial/wiki/lesson-12
             */
            detailRowComponent: {
                type: String,
            },

            /**
             * Paginator component, choose between croud-pagination, vuetable-pagination or vuetable-dropdown-pagination
             */
            paginatorComponent: {
                type: String,
                default: 'croud-pagination',
            },

            /**
             * Transform function for preping the pagination data
             *
             * The default for this prop works with core
             */
            transform: {
                type: Function,
                default(data) {
                    data.meta.pagination = {
                        last_page: data.meta.pagination.total_pages,
                        next_page_url: data.meta.pagination.links.next,
                        prev_page_url: data.meta.pagination.links.previous,
                        from: (data.meta.pagination.per_page * data.meta.pagination.current_page) - (data.meta.pagination.per_page - 1),
                        to: Math.min((data.meta.pagination.per_page * data.meta.pagination.current_page), data.meta.pagination.total),
                        ...data.meta.pagination,
                    }
                    return data
                },
            },

            /**
             * getSortParam function for altering vuetables default sort query string
             *
             * The default for this prop works with core
             */
            getSortParam: {
                type: Function,
                default(sortOrder) {
                    return sortOrder.map(sort => (`${sort.sortField},${sort.direction}`)).join('|')
                },
            },
        },

        methods: {
            onPaginationData(paginationData) {
                this.$emit('vuetable:pagination-data', paginationData)
                this.$refs.pagination.setPaginationData(paginationData)
                this.$refs.paginationInfo.setPaginationData(paginationData)
            },

            onChangePage(page) {
                this.$refs.vuetable.changePage(page)
            },

            onCellClicked(data) {
                this.$refs.vuetable.toggleDetailRow(data.id)
            },
        },

        data() {
            return {
                loading: false,
            }
        },

        computed: {
            config() {
                return defaultsDeep(this.vuetableConfig, {
                    'pagination-path': 'meta.pagination',
                    'per-page': 15,
                    'query-params': {
                        sort: 'order_by',
                        page: 'page',
                        perPage: 'per_page',
                    },
                    noDataTemplate: '<div class="ui center aligned basic segment"><i class="big circular yellow list icon"></i></br>No Results</div>',
                    css: {
                        tableClass: 'ui table',
                        dropdownClass: 'ui dropdown',
                        ascendingIcon: 'arrow circle down icon',
                        descendingIcon: 'arrow circle up icon',
                        renderIcon(classes) {
                            return `<i class="${classes.join(' ')}"></i>`
                        },
                    },
                })
            },
        },

        watch: {
            vuetableConfig: {
                deep: true,
                handler: debounce(function () {
                    if (!this.$refs.vuetable || !this.$refs.vuetable.$el) return
                    this.$refs.vuetable.refresh()
                }, 500),
            },
        },
    }
</script>
