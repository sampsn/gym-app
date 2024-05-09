
from datetime import datetime
from uuid import UUID
from uuid import uuid4 as new_uuid

from sqlmodel import SQLModel, Field, Column, Relationship, Integer, ForeignKey, Text

from models.utility import GUID



class CustomExerciseBase(SQLModel):
    name: str 
    description: str = Field(Column(Text)) 

class CustomExerciseTableBase(CustomExerciseBase):
    id: int | None = Field(default=None, primary_key=True, index=True)
    uuid: UUID | None = Field(default_factory=new_uuid, sa_column=Column(GUID(), unique=True, index=True))
    workout_category_id: int | None = Field(default=None, foreign_key="workoutcategory.id", index=True)
    movement_category_id: int | None = Field(default=None, foreign_key="movementcategory.id", index=True)
    equipment_id: int | None = Field(default=None, foreign_key="equipment.id", index=True)
    major_muscle_id: int | None = Field(default=None, foreign_key="majormuscle.id", index=True)
    

class CustomExerciseCreateReq(CustomExerciseBase):
    workout_category: str 
    movement_category: str 
    equipment: str 
    major_muscle: str 
    specific_muscles: list[str] 

class CustomExercisePatchReq(CustomExerciseBase):
    name: str | None = None
    description: str | None = None
    workout_category: str | None = None
    movement_category: str | None = None
    equipment: str | None = None
    major_muscle: str | None = None
    specific_muscles: list[str] | None = None
