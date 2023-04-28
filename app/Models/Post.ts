import { DateTime } from 'luxon'
import { BaseModel, column, scope, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public image: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  public static remove = scope((query) => {
    query.select('id','user_id','image','description')
  })

  @hasMany(()=> Comment,{
    foreignKey: 'post_id'
  } )
  public comments: HasMany<typeof Comment>

}