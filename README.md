create database todo_app;
create table todo_app.todo_task (id int unsigned auto_increment not null, label varchar(255) not null,user_id int unsigned not null,date date not null, done bit not null, description varchar(255), PRIMARY KEY (id));

dev:
./cloud_sql_proxy -instances=todo-320907:asia-northeast1:todo-dev=tcp:3306

prd:
./cloud_sql_proxy -instances=todo-320907:asia-northeast1:todo-prod=tcp:3306

git clone https://github.com/to24toro/todo.git
cd todo
npm i
cp config.copy.json config.json
setting password
