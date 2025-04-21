const formArray=[
    // {id:1,name:'id',type:'number'},
    {id:2,name:'name',type:'text'},
    {id:3,name:'email',type:'email'},
    {id:4,name:'gender',type:'select', categories:['male','female']},
    {id:5,name:'status',type:'select',categories:['inactive','active']}
]
const tableHeader = [
    { id: 1, title: 'id', selector: 'id' },
    { id: 2, title: 'Name', selector: 'name' },
    { id: 3, title: 'Email', selector: 'email' },
    { id: 4, title: 'Gender', selector: 'gender' },
    { id: 5, title: 'Status', selector: 'status' }
];

export{formArray,tableHeader}