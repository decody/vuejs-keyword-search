import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

new Vue({
    el: '#app',
    data: {
        query: '',
        submitted: false,      // 검색여부를 판단하는 변수
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab: '',
        keywords: [],
        history: [],
        searchResult: []
    },
    created() {
        this.selectedTab = this.tabs[0]
        this.fetchKeyword()
        this.fetchHistory()
    },
    methods: {
        onSubmit(e) {
            this.search()
        },
        onKeyup() {
            if (!this.query.length) this.onReset()  
        },
        search() {
            SearchModel.list().then(data => {
                this.submitted = true
                this.searchResult = data
            })
            HistoryModel.add(this.query)
            this.fetchHistory()
        },
        onReset() {
            this.resultForm()
        },
        onClickTab(tab) {
            this.selectedTab = tab
        },
        onClickKeyword(keyword) {
            // debugger
            this.query = keyword
            this.search()
        },
        onClickRemoveHistory(keyword) {
            HistoryModel.remove(keyword)
            this.fetchHistory()
        },
        fetchKeyword() {
            KeywordModel.list().then(data => {
                this.keywords = data
            })
        },
        fetchHistory() {
            HistoryModel.list().then(data => {
                this.history = data
            })
        },
        resultForm() {
            this.query = ''
            this.submitted = false
            this.searchResult = []
        }
    }
})