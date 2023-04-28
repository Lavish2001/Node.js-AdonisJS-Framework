import { DateTime } from 'luxon'
import { BaseModel, column, scope, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public post_id: number

  @column()
  public text: string

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static remove = scope((query) => {
    query.select('id','post_id','text','user_id')
  })


  @belongsTo(()=> User,{
    foreignKey: 'user_id'
  } )
  public user: BelongsTo<typeof User>

}