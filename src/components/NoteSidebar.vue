<template>
  <div class="note-sidebar">
    <span class="btn add-note"></span>
    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        我的笔记本1
        <i class="iconfont icon-down"></i>
      </span>
      <button class="add-note">添加笔记</button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :key="notebook.id">{{ notebook.title }}</el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link to="`/note?noteId=${note.id}`">
          <span class="date">{{ note.createdAt }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "NoteSidebar",
  data() {
    return {
      notebooks: [
        {
          id: 1,
          title: '笔记本一'
        },
        {
          id: 2,
          title: '笔记本二'
        },
        {
          id: 3,
          title: '笔记本三'
        },
      ],
      notes: [
        {
          id: 10,
          title: 'hello1',
          createdAt: '刚刚'
        },
        {
          id: 11,
          title: 'hello2',
          createdAt: '十分钟前'
        },
        {
          id: 12,
          title: 'hello3',
          createdAt: '一小时前'
        },
      ]
    }
  },
  methods: {
    handleCommand() {
      console.log('ding...')
    }
  }
}
</script>

<style scoped lang="less">
@import url(../assets/style/note-sidebar);
</style>
