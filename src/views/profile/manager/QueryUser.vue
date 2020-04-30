<template>
  <div>
    <el-select @change="getUser" v-model="roleId" placeholder="请选择身份">
      <el-option
        v-for="item in roleList"
        :key="item.roleId"
        :label="item.roleName"
        :value="item.roleId">
      </el-option>
    </el-select>
    <el-table
      :data="userList"
      border
      stripe
      size="medium "
      style="width: 100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="lastLoginTime"
        label="最后登录日期"
        sortable
        width="300">
      </el-table-column>
      <el-table-column
        prop="examId"
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            width="400"
            trigger="click">
            <div style="height: 100px">
              <el-select v-model="newRoleId" placeholder="请选择身份">
                <el-option
                  v-for="item in roleList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
              <br/>
              <el-button style="margin-top: 20px" @click="updateRole" type="primary">保存</el-button>
            </div>
            <el-button @click="handleClick(scope.row)" slot="reference" type="primary">修改角色</el-button>
          </el-popover>
          <el-button v-show="roleId===2" @click="ediaSubject(scope.row)" type="primary">修改所授科目</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
      style="margin-top: 20px">
    </el-pagination>
  </div>
</template>

<script>
  import {request, Qs} from "network/request";

  export default {
    name: "QueryUser",
    data() {
      return {
        roleList: [],
        roleId: '',
        newRoleId: '',
        userList: [],
        total: 0,
        pageNum: 1,
        editUserId: '',
      }
    },
    created() {
      request({
        method: 'get',
        url: '/role/all'
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.message);
        } else {
          this.roleList = res.data.data;
        }
      })
    },
    methods: {
      getUser(value) {
        this.roleId = value;
        request({
          method: 'get',
          url: '/user/all',
          params: {
            roleId: this.roleId,
            pageNum: this.pageNum
          }
        }).then(res => {
          if (!res.data.success) {
            this.$message.error(res.data.message);
          } else {
            this.userList = res.data.data.list.filter(data => {
              return data.userId !== this.$store.state.user.userId
            });
            this.total = res.data.data.total;
          }
        }).catch(res => {
            this.$message.error("查询信息失败，请稍后再试");
          }
        )
      },
      currentChange(currentPage) {
        this.pageNum = currentPage;
        this.getUser(this.roleId);
      },
      handleClick(row) {
        this.editUserId = row.userId;
      },
      ediaSubject(row) {
        this.$router.push('/profile/user/subject/' + row.userId)
      },
      updateRole() {
        request({
          method: 'put',
          url: '/user/' + this.editUserId + '/' + this.newRoleId,
        }).then(res => {
          if (!res.data.success) {
            this.$message.error(res.data.message);
          } else {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.editUserId = '';
            this.newRoleId = '';
          }
        }).catch(res => {
            this.$message.error("修改失败，请稍后再试");
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
