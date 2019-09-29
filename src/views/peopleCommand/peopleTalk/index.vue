<template>
	<div>
		<div class="toolbar" style="float: left;">
			<el-form :inline="true"><!-- :size="size" -->
				<el-form-item label="名称">
					<el-input v-model="search.mingcheng" placeholder="搜索条件"></el-input>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input v-model="search.nianling" placeholder="搜索条件"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button  label="查询" type="primary" @click="query">查询</el-button>
				</el-form-item><!-- icon="fa fa-search" -->
				<el-form-item>
					<el-button label="新增" type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 主内容 -->
		<el-table :data="pageResult" border stripe size="mini" style="width: 100%" row-key="id">
			<el-table-column type="index" header-align="left" align="left" show-overflow-tooltip label="序号" />
			<el-table-column prop="name" header-align="left" align="left" show-overflow-tooltip label="姓名" />
			<el-table-column prop="phone" header-align="left" align="left" show-overflow-tooltip label="电话" />
			<el-table-column prop="type" header-align="left" align="left" show-overflow-tooltip label="事件类型" />
			<el-table-column prop="description" header-align="left" align="left" show-overflow-tooltip label="事件详细描述" />
			<el-table-column prop="photo" header-align="left" align="left" show-overflow-tooltip label="事件照片" >
				<template slot-scope="scope">
					<img :src="scope.row.photo">
				</template>
			</el-table-column>
			<el-table-column prop="wangluo" header-align="left" align="left" show-overflow-tooltip label="所在网络" />
			<el-table-column prop="dizhi" header-align="left" align="left" show-overflow-tooltip label="事件地址" />
			<el-table-column prop="erweima" header-align="left" align="left" show-overflow-tooltip label="房屋二维码" />
			<el-table-column :label="'操作'">
				<template slot-scope="scope">
					<el-button size="mini" icon="el-icon-delete-solid" label="查看" type="text" @click="see(scope.row)">查看</el-button>
					<el-button size="mini" icon="el-icon-delete-solid" label="删除" type="text" @click="del(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--分页栏-->
		<!-- <div class="pagination">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="refreshPageRequesta" @size-change="handleSizeChangea"
			 :current-page="box.pageNum" :page-size="box.pageSize" :total="box.total">
			</el-pagination>
		</div> -->
 <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                            v-if='box.total > 0'
                            :page-sizes="box.pageSizes"
                            :page-size="box.pageSize"
                            :layout="box.layout"
                            :total="box.total"
                            :current-page='box.pageIndex'
                            @current-change='refreshPageRequesta'
                            @size-change='handleSizeChangea'>
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
      <!--新增（）界面-->
    <el-dialog title="新增" width="600px"  :visible.sync="addloading"  :close-on-click-modal="false">
        <el-form :model="addForm" label-width="120px" :rules="addFormRules"  ref="addForm" :size="size">
            <el-form-item label="姓名:" prop="name">
                <el-input v-model="addForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="phone">
                <el-input v-model="addForm.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="事件类型:" prop="type">
                <el-input v-model="addForm.type" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="事件详细描述:" prop="description">
                <el-input v-model="addForm.description" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="事件照片:" prop="photo">
                <el-input v-model="addForm.photo" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item label="所在网络:" prop="wangluo">
                <el-input v-model="addForm.wangluo" auto-complete="off" type="textarea"  show-word-limit></el-input>
            </el-form-item>
             <el-form-item label="事件地址:" prop="dizhi">
                <el-input v-model="addForm.dizhi" auto-complete="off" type="textarea"  show-word-limit></el-input>
            </el-form-item>
             <el-form-item label="房屋二维码:" prop="erweima">
                <el-input v-model="addForm.erweima" auto-complete="off" type="textarea"  show-word-limit></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button :size="size" @click.native="addloading = false">取消</el-button>
            <el-button :size="size" type="primary" @click.native="submitForm" edit>提交</el-button>
        </div>
    </el-dialog>

	</div>
</template>

<script>
	import axios from 'axios'
	import Mock from 'mockjs'
	Mock.mock('http://peopleTalk.com', {
		'shuju|56': [{
			id:"@id",
			name:"@cname",
			phone:/^1[385][1-9]\d{8}/,
			'type|1': ['民事纠纷', '消防安全', '市容秩序'],
			description:"@cparagraph",
			// photo: "@image('100x50', '@hex', '@hex', 'png', '')",
      photo:"http://nvzhuang.ping-jia.net/img.php?pic=http://img1.cache.netease.com/catchpic/0/09/0930DB2BF003ED1A3D504CFCF250E635.jpg",
			"wangluo|8":"@city",
			dizhi:"@county(true)",
			erweima:"@guid",
		}]
	})
	export default {
		data() {
			return {
				size:"small",
				search: {
					mingcheng: "",
					nianling: "",
				},
				pageResult: [],
				box: {
				 total: 0,        // 总数
				pageIndex: 1,  // 当前位于哪页
				pageSize: 20,   // 1页显示多少条
				pageSizes: [5, 10, 15, 20],  //每页显示多少条
				layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
				},
        addloading:false,
        addForm:{
          id:"",
          name:"",
          phone:"",
          type:"",
          description:"",
          photo:"",
          wangluo:"",
          dizhi:"",
          erweima:"",
        },
        addFormRules:{
name:[{ required: true, message: "请输入姓名", trigger: "blur" }],
phone:[{ required: true, message: "请输入电话", trigger: "blur" }],
type:[{ required: true, message: "请输入事件类型", trigger: "blur" }],
description:[{ required: true, message: "请输入事件详细描述", trigger: "blur" }],
photo:[{ required: true, message: "请输入事件照片", trigger: "blur" }],
wangluo:[{ required: true, message: "请输入所在网络", trigger: "blur" }],
dizhi:[{ required: true, message: "请输入事件地址", trigger: "blur" }],
erweima:[{ required: true, message: "请输入房屋二维码", trigger: "blur" }],
        }
			}
		},
		created() {
			this.fetchData()
			// axios.get("http://123.com").then(res => {
			// 	console.log(res.data.shuju);
			// 	this.cunru = res.data.shuju
			// })

		},
		watch: {
			"search.mingcheng": [
				function() {
					clearTimeout(this.timer);
					this.timer = setTimeout(() => {
						this.fetchData()
					}, 500)
				}
			],
			"search.name": [
				function() {
					clearTimeout(this.timera);
					this.timera = setTimeout(() => {
						this.fetchData()
					}, 500)
				}
			],
		},
		methods: {
			fetchData() {
				axios({
					method: "get",
					url: "http://peopleTalk.com",
					// url: "http://localhost:3000/list",

				}).then(res => {
					this.pageResult = res.data.shuju
					this.box.total = res.data.shuju.length
					console.log(res)
				})
			},
			query() {//查询
				axios({
					method: "get",
					url: `http://localhost:3000/list?name=${this.search.mingcheng}`
				}).then(res => {
					this.pageResult = res.data
					this.box.total = res.data.length
					console.log(res)
				})
			},
			handleAdd() {//新增按钮
this.addloading=true
			},
      submitForm(){//新增提交
      this.$refs.addForm.validate(valid => {
      if (valid) {

this.pageResult.unshift(this.addForm)
this.addloading=false
        }
      })
      },
			see(row) {},
			del(index, row) {//删除
				console.log(index)
				this.pageResult.splice(index, 1)
			},
			//分页
			refreshPageRequesta(pagea) {
				this.box.pageIndex = pagea
			},
			handleSizeChangea(vala) {
				this.box.pageSize = vala
			},
		}




	}
</script>

<style scoped>
	/deep/ .el-form-item__content {
		line-height: 33px;
		text-align: left;
	}

	.tips {
		display: inline-block;
		float: right;
	}
  img{
    width: 100px;
    height:50px;
  }
</style>
