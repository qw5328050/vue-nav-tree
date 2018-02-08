<template>
  <div class="nav-bar">
    <partTree v-for="(tree, i) in treeData" :key="'root' + i" :model="tree"></partTree>
  </div>
</template>

<script>
import partTree from './part-tree.vue'
export default {
  data () {
    return {
      treeData: [
        {
          name: '本地资源',
          active: true,
          childList: [
            {
              name: 'jamseProject',
              active: false,
              childList: [
                {
                  name: 'amandaPrject',
                  childLIst: []
                }
              ]
            }
          ]
        },
        { name: '网络资源', active: false, childList: [] },
        { name: '系统资源', active: false }
      ]
    }
  },
  components: { partTree }
}
</script>

<style lang="scss">
  .nav-bar{
    li {
      list-style-type:none;
    }
  }
</style>
