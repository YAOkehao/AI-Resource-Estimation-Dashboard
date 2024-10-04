import csv
from sqlalchemy import create_engine, Column, Integer, VARCHAR, TEXT
from sqlalchemy.orm import declarative_base, Session

#Create engine
engine = create_engine('sqlite:///db/dataBase.db?check_same_thread=False', echo=True)

#Declare base class
Base = declarative_base()

#ORM model class
class LLM(Base):
    __tablename__ = 'LLM'
    id = Column(Integer, primary_key=True)
    Name = Column(VARCHAR(30))
    Development_Company = Column(VARCHAR(30))
    Price = Column(Integer)
    Response_Speed = Column(Integer)
    Accuracy = Column(Integer)
    Ethical_Training = Column(Integer)
    Green_Computing_Resources = Column(Integer)
    Local_Deployment_Capability = Column(Integer)
    Training_Resource_Requirements = Column(Integer)
    Fine_Tuning_Difficulty = Column(Integer)
    Multilingual_Support_Capability = Column(Integer)
    Model_Scalability = Column(Integer)
    Text_Generation = Column(Integer)
    Image_Generation = Column(Integer)
    Song_Generation = Column(Integer)
    Code_Generation = Column(Integer)
    Table_Processing = Column(Integer)
    Summarization = Column(Integer)
    Logical_Reasoning = Column(Integer)
    Mathematical_Problem_Solving = Column(Integer)
    Description = Column(TEXT)

    def __repr__(self):
        return f'LLM:\nid: {self.id}\n'

#Initialize database
def init_db():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    #Create a session and use the context manager
    with Session(engine) as session:
        init_data(session)

#Get session
def get_session():
    return Session(engine)

#Initialize data
def init_data(session):
    with open('db/data.csv', newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader)
        for line in reader:
            model = LLM(Name=line[0], Development_Company=line[1], Price=int(line[2]), Response_Speed=int(line[3]), 
                        Accuracy=int(line[4]), Ethical_Training=int(line[5]), Green_Computing_Resources=int(line[6]), 
                        Local_Deployment_Capability=int(line[7]), Training_Resource_Requirements=int(line[8]), 
                        Fine_Tuning_Difficulty=int(line[9]), Multilingual_Support_Capability=int(line[10]), 
                        Model_Scalability=int(line[11]), Text_Generation=int(line[12]), Image_Generation=int(line[13]), 
                        Song_Generation=int(line[14]), Code_Generation=int(line[15]), Table_Processing=int(line[16]), 
                        Summarization=int(line[17]), Logical_Reasoning=int(line[18]), 
                        Mathematical_Problem_Solving=int(line[19]), Description=line[20])
            session.add(model)
    session.commit()