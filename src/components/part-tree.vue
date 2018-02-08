<template>
  <li class="children">
    <div :class="{active: model.active}" class="children-content" @click="showNavCont">
      <i v-show="model.hasOwnProperty('childList') && hideIcon"  @click.stop.prevent='toggle' v-if='isFolder' class="mui-icon iconfont" :class="[open?'icon-wenjianjia':'icon-wenjianjiaguanbi']">></i>
      <!--isFolder判断是否存在子级改变图标-->
      <i v-show="model.hasOwnProperty('childList') && hideIcon" @click.stop.prevent='toggle' :class="{'mui-icon': model.hasOwnProperty('childList') && hideIcon }" class="iconfont icon-wenjian" v-else>></i>
      <span> {{model.name}} </span>
    </div>
    <ul v-show="open" v-if='isFolder'>
      <tree-menu ref="children" v-for='(cel, i) in model.childList' :model='cel' @deleteFolder="deleteFolder" @selectNode="selectNode" :key="'cell' + i"></tree-menu>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'treeMenu',
  props: {
    model: Object
  },
  data () {
    return {
      open: false,
      isFolder: true,
      hideIcon: true,
      currentMode: false,
      showMoveModal: false
    }
  },
  methods: {
    showNavCont () {},
    toggle () {
      if (this.isFolder) { this.open = !this.open }
    },
    deleteFolder () {},
    selectNode () {}
  }
}
</script>

<style lang="scss">
  .children {
    padding: 13px 0 12px 40px;
    ul {
      max-height: 400px;
      overflow: hidden;
      overflow-y: auto;
      width: 110%;
    }
    .children-content {
      a{
        color: #404040;
        //text-decoration: underline;
      }
      i.mui-icon {
        display: inline-block;
        width: 15px;
        background-repeat: no-repeat;
        margin-left: -15px;
      }
      i{
        opacity: 0.8;
        color: #f0ad4e;
      }
      .tree-menu li {
        line-height: 1.5;
      }
    }
  }
</style>
