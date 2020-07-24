module.exports = function(sequelize, DataTypes) {
    var Blog = sequelize.define("Blog", {
      // Giving the Blog model a name of type STRING
      title:DataTypes.STRING,
      body:DataTypes.STRING
    });
  
    Blog.associate = function(models){
        Blog.belongsTo(models.User)
    }
  
    return Blog;
  };