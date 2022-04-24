<template>
  <section class="pos" @click="oyna">
    <Search class="search-box">
      <div class="input-container">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Поиск товаров"
          @keyup="SearchHendle"
          class="search-input form-control"
          v-model="search"
        />
        <ul class="dirnks-list" v-if="dirnks_list">
          <li
            v-for="(item, index) in dirnks_data"
            :key="index"
            @click="sendTable(item)"
          >
            <span>{{ item.name }}</span> <span>{{ item.barcode }}</span>
          </li>

        </ul>
      </div>
      <button class="btn search-btn">Бистрей продуcти</button>
    </Search>
    <div class="wrapper">
      <table class="table table-striped bg-white" style="color: gray">
        <thead >
          <tr>
          <th>#</th>
          <th>НАЗВАНИE</th>
          <th>СТЕНА</th>
          <th>КОЛ-ВО</th>
          <th>ИТОГО</th>
          </tr>
        </thead>
        <tbody class="p-3">
          <tr v-for="(item,index) in items" :key="index" @click="itemCheck(item,index)" :class="{item_active:itemColor === index}">
            <td>{{index+1}}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.cost }}</td>
          </tr>
        </tbody>
      </table>

      <div class="cal-box">
        <p><b>Номер чека 77157</b></p>
        <div class="price-show-box">
          <p><b>Итого</b> <b>{{postItem.total ? postItem.total : "0" }}</b></p>
          <hr />
          <p>
             <span>Получено</span>
            <b>{{ priceWriter }}</b>
          </p>
          <p><small>Сдача</small> <b>{{ Zdacha }}</b></p>
        </div>

        <table class="text-center w-100">
          <tbody>
            <tr>
              <td>
                <i
                  @click="itemDelete"
                  class="fa-solid fa-trash-can text-danger"
                  style="border: 2px red solid"
                ></i>
              </td>
              <td>
                <i class="fa-solid fa-minus" style="border: 2px blue solid" ></i>
              </td>
              <td>
                <i class="fa-solid fa-plus" style="border: 2px blue solid"></i>
              </td>
            </tr>
            <tr>
              <td><b @click="numberClick">1</b></td>
              <td><b @click="numberClick">2</b></td>
              <td><b @click="numberClick">3</b></td>
            </tr>
            <tr>
              <td><b @click="numberClick">4</b></td>
              <td><b @click="numberClick">5</b></td>
              <td><b @click="numberClick">6</b></td>
            </tr>
            <tr>
              <td><b @click="numberClick">7</b></td>
              <td><b @click="numberClick">8</b></td>
              <td><b @click="numberClick">9</b></td>
            </tr>
            <tr>
              <td><b @click="numberClick">0</b></td>
              <td><b @click="numberClick">.</b></td>
              <td><i class="fa-solid fa-delete-left" @click="deleteLeft"></i></td>
            </tr>
            <tr>
              <td colspan="3">
                <button class="btn form-control btn-primary my-2 py-3" @click="sendSaleItems" ref="btn">
                  Оплата
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import Search from "@/components/Search";
import axios from "axios";
export default {
  name: "Home",
  components: {
    Search,
  },

  data() {
    return {
      search: "",
      price_writer:[],
      dirnks_list: false,
      dirnks_data: [],
      dirnk_token: JSON.parse(localStorage.getItem("myToken")),
      dirnks_table: [],
      items:[],
      sale_id:null,
      itemIndex:null,
      itemColor:null,
      postItem:{},
      btnSucces:"lime",

    }
  },

  mounted(){
   // if (this.dirnks_table.length === 0) {
    
   // }
  },




computed: {
  Zdacha(){
    return this.postItem.total < Number(this.price_writer.join(""))  ? this.postItem.total - Number(this.price_writer.join("")) : "0";
  },

  priceWriter(){
    return this.price_writer.join("") == "" ? "0" : this.price_writer.join("");
  }
},



  methods: {
    async SearchHendle() {
      if (this.search.length > 2) {
        this.dirnks_list = true;
        const res = await axios.get(
          `https://frontend-task.depocloud.ml/api/mobile/items/search?query=${this.search}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.dirnk_token.access_token,
            },
          }
        );
        this.dirnks_data = res.data.items;
      } else {
        this.dirnks_list = false;
      }
    },

    oyna() {
      this.dirnks_list = false;

    },

    async sendTable(item) {
      console.log(this.price_writer)
      this.search = "";

     const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.dirnk_token.access_token,
          };

      const itemByBarcode = await axios.get(`https://frontend-task.depocloud.ml/api/mobile/items/show?barcode=${item.barcode}`,{headers});
      console.log(itemByBarcode)
       const {id, qty, cost,name, price} = itemByBarcode.data.item;
        this.items.push({id, qty, cost, name, price}); 
    

    },


async sendSaleItems(){
  const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.dirnk_token.access_token,
          };

 const data = {items:[this.postItem]};

if (!Number(this.price_writer.join(""))) {
   alert("summa kiriting !")
}else if(Number(this.price_writer.join("")) < this.items[this.itemIndex].cost){
  alert("summangiz kam")
}else if(Number(this.price_writer.join("")) >= this.items[this.itemIndex].cost){
 alert("mahsulotni sotib olganingiz uchun rahmat 🙆‍♂️")
 const sale = await axios.post("https://frontend-task.depocloud.ml/api/mobile/sales",data,{headers})
 this.sale_id = sale.data.sale.id;
   if(this.sale_id){
    const getItems = await axios.get(`https://frontend-task.depocloud.ml/api/mobile/sales/show?sale_id=${this.sale_id}`,{headers});
    this.dirnks_table = getItems.data.sale.items;

    }
  

}




},

itemCheck(item,index){
  this.itemColor = index;
  this.itemIndex = index;
  const {id,qty,price} = item;
  this.postItem = {"item_id":id,"qty":qty,"total":price};
},

itemDelete(){
  if(this.itemIndex !== null){
    this.items.splice(this.itemIndex,1);
    this.itemColor = false;
    this.price_writer = [];
    this.postItem = {};

  }
},

deleteLeft(){
  this.price_writer.pop();
},


numberClick(e){

  if(this.price_writer.length < 1000000){
    this.price_writer.push(e.target.innerHTML);
  }
},


  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
.pos {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wrapper {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  table {
    width: 80%;
    border-radius: 5px;
    .item_active {
      background:blue;
      color:white;
      cursor: pointer;
    }
  }
  .cal-box {
    width: 20%;
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    .price-show-box p {
      display: flex;
      justify-content: space-between;
      .price-writer{
        border:none;
        outline:none;
        background:transparent;
      }
    }

    tbody {
     i, b {
        width: 70px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 3px;
        background: #dcdcdc;
        border-radius: 5px;
        word-break:break-all;
        &:hover {
          border: 2px gray solid;
        }
      }
    }
  }
}

.search-box {
  width: 100%;
  .input-container {
    position: relative;
    width: 50%;
    i {
      position: absolute;
      left: 15px;
      top: 30%;
      color: gray;
    }
    .search-input {
      width: 100%;
      padding: 7px 50px;
    }

    .dirnks-list {
      position: absolute;
      top: 120%;
      width: 100%;
      height: 500px;
      overflow: auto;
      background: white;
      list-style: none;
      box-shadow: 5px 0px 50px 5px;
      z-index: 1;
      padding: 0;
      margin: 0;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 20px;
        &:nth-child(even) {
          background: #dcdcdc;
          width: 100%;
        }

        &:hover {
          background: blue;
          color: white;
        }
      }
    }
  }

  .search-btn {
    background: white;
    padding: 7px 30px;
  }
}
</style>
